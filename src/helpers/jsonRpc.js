
export const baseFetchOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
};

export const jsonRpcFetch = (fetch, node, body) =>
  fetch(node, {
    ...baseFetchOptions,
    body,
  }).then(response => response.json());
