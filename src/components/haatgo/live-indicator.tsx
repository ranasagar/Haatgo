
"use client";

import { useState, useEffect } from 'react';
import { LivestreamViewer } from "./livestream-viewer";
import { fetchLivestream, type LivestreamData } from "@/ai/flows/livestream-fetcher";
import { Skeleton } from '@/components/ui/skeleton';

export function LiveIndicator() {
  const [livestreamData, setLivestreamData] = useState<LivestreamData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStreamStatus = async () => {
      try {
        const data = await fetchLivestream({ platform: 'facebook', identifier: 'haatgo' });
        setLivestreamData(data);
      } catch (error) {
        console.error("Failed to fetch livestream status:", error);
        setLivestreamData(null);
      } finally {
        setLoading(false);
      }
    };
    checkStreamStatus();
  }, []);

  if (loading) {
    return <Skeleton className="h-96 w-full rounded-xl" />;
  }

  if (livestreamData?.isLive) {
    return <LivestreamViewer />;
  }

  return null;
}
