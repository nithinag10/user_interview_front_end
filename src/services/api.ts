import { ChatMessage, Insights } from "@/types/interview";

// Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Types for API responses
interface StartInterviewResponse {
  interviewId: string;
  status: "in-progress";
}

interface InterviewStatusResponse {
  interviewId: string;
  status: "in-progress" | "completed" | "failed";
  messageCount: number;
  isComplete: boolean;
}

// API Service Class
class ApiService {
  public baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Start a new interview session
   */
  async startInterview(
    personaId: string,
    problem: string,
    solution: string
  ): Promise<StartInterviewResponse> {
    const response = await fetch(`${this.baseUrl}/api/interviews/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ persona_id: personaId, problem, solution }),
    });

    if (!response.ok) {
      throw new Error(`Failed to start interview: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get interview status
   */
  async getInterviewStatus(
    interviewId: string
  ): Promise<InterviewStatusResponse> {
    const response = await fetch(
      `${this.baseUrl}/api/interviews/${interviewId}/status`
    );

    if (!response.ok) {
      throw new Error(`Failed to get interview status: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get interview insights (after completion)
   */
  async getInsights(interviewId: string): Promise<Insights> {
    const response = await fetch(
      `${this.baseUrl}/api/interviews/${interviewId}/insights`
    );

    if (!response.ok) {
      throw new Error(`Failed to get insights: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Create Server-Sent Events (SSE) connection for real-time interview messages
   */
  createInterviewStream(
    interviewId: string,
    onMessage: (message: ChatMessage) => void,
    onComplete: () => void,
    onError: (error: Event) => void
  ): EventSource {
    const sseUrl = `${this.baseUrl}/api/interviews/${interviewId}/stream`;
    console.log("📡 Creating SSE connection to:", sseUrl);

    const eventSource = new EventSource(sseUrl);

    eventSource.onopen = () => {
      console.log("✅ SSE connected for interview:", interviewId);
    };

    // Listen for 'message' events
    eventSource.addEventListener("message", (event) => {
      console.log("📨 SSE message event received");
      try {
        const data = JSON.parse(event.data);
        console.log("📦 Parsed message:", data);

        if (data.type === "message") {
          console.log(
            "💬 Interview message:",
            data.payload.agent,
            "-",
            data.payload.message.substring(0, 50) + "..."
          );
          onMessage(data.payload);
        }
      } catch (error) {
        console.error("❌ Failed to parse SSE message:", error);
      }
    });

    // Listen for 'complete' events
    eventSource.addEventListener("complete", (event) => {
      console.log("✅ Interview complete event received!");
      try {
        const data = JSON.parse(event.data);
        console.log("📦 Complete data:", data);
        onComplete();
        eventSource.close();
      } catch (error) {
        console.error("❌ Failed to parse complete event:", error);
      }
    });

    // Listen for 'error' events from server
    eventSource.addEventListener("error", (event) => {
      console.log("📨 SSE error event received");
      try {
        const data = JSON.parse((event as MessageEvent).data);
        console.error("❌ Server error:", data.payload);
        onError(new Event("error"));
        eventSource.close();
      } catch (error) {
        // This might be a connection error, not a server error event
        console.error("❌ SSE connection error");
      }
    });

    // Handle connection errors
    eventSource.onerror = (error) => {
      console.error("❌ SSE connection error:", error);
      // Only call onError if the connection is closed
      if (eventSource.readyState === EventSource.CLOSED) {
        onError(error as Event);
      }
    };

    return eventSource;
  }
}

// Export singleton instance
export const apiService = new ApiService(API_BASE_URL);

// Export types
export type { StartInterviewResponse, InterviewStatusResponse };
