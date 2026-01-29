import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { ChatRequest, ChatResponse } from "@shared/schema";

// Assignments Hooks
export function useAssignments() {
  return useQuery({
    queryKey: [api.assignments.list.path],
    queryFn: async () => {
      const res = await fetch(api.assignments.list.path);
      if (!res.ok) throw new Error("Failed to fetch assignments");
      return api.assignments.list.responses[200].parse(await res.json());
    },
  });
}

export function useAssignment(id: number) {
  return useQuery({
    queryKey: [api.assignments.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.assignments.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch assignment");
      return api.assignments.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

// Skills Hooks
export function useSkills() {
  return useQuery({
    queryKey: [api.skills.list.path],
    queryFn: async () => {
      const res = await fetch(api.skills.list.path);
      if (!res.ok) throw new Error("Failed to fetch skills");
      return api.skills.list.responses[200].parse(await res.json());
    },
  });
}

// Reflections Hooks
export function useReflections() {
  return useQuery({
    queryKey: [api.reflections.list.path],
    queryFn: async () => {
      const res = await fetch(api.reflections.list.path);
      if (!res.ok) throw new Error("Failed to fetch reflections");
      return api.reflections.list.responses[200].parse(await res.json());
    },
  });
}

// Chat Hooks
export function useChat() {
  return useMutation({
    mutationFn: async (data: ChatRequest) => {
      const res = await fetch(api.chat.send.path, {
        method: api.chat.send.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to send message");
      }
      
      return api.chat.send.responses[200].parse(await res.json());
    },
  });
}
