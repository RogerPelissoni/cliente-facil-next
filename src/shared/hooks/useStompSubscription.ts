"use client";

import { useStompContext } from "@/src/shared/providers/StompProvider";
import type { IMessage } from "@stomp/stompjs";
import { useEffect } from "react";

export function useStompSubscription(destination: string, onMessage: (message: IMessage) => void) {
  const { subscribe } = useStompContext();

  useEffect(() => {
    return subscribe(destination, onMessage);
  }, [destination, onMessage, subscribe]);
}
