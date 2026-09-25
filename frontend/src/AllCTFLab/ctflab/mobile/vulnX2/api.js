const API_URL =
  import.meta.env.VITE_API_URL || "/api";

export const submitVulnX2Flag = async (flag) => {
  const response = await fetch(
    `${API_URL}/allctflab/mobile/vulnx2/submit`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flag: flag.trim(),
      }),
    }
  );

  const data = await response.json();

  return {
    ok: response.ok,
    ...data,
  };
};