export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(trigger(env));
  },

  // Optional: open the Worker URL in a browser to test it manually
  async fetch(request, env) {
    const res = await trigger(env);
    return new Response(`GitHub responded: ${res.status}`);
  },
};

async function trigger(env) {
  const res = await fetch(
    "https://api.github.com/repos/SaheelZzz/runner/actions/workflows/retry.yml/dispatches",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "oci-trigger-worker",
      },
      body: JSON.stringify({ ref: "main" }),
    }
  );
  console.log("GitHub status:", res.status);
  return res;
}
