//====================================
//src/client/hooks/useCheckTenantId.ts
//====================================

import { useState, useEffect } from "react";
import axios from "axios";

export function useCheckTenantId(tenantId: string) {
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tenantId || tenantId.length < 3) {
      setAvailable(null);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/auth/check-tenant-id`, {
          params: { tenant_id: tenantId },
        });
        setAvailable(res.data.available);
      } catch {
        setAvailable(null);
      } finally {
        setLoading(false);
      }
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [tenantId]);

  return { available, loading };
}
