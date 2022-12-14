export function readerToResponse(
  reader: ReadableStreamDefaultReader<Uint8Array>,
): Response {
  const stream = new ReadableStream({
    start(controller) {
      return pump();

      function pump(): Promise<undefined> | undefined {
        return reader.read().then(({ done, value }) => {
          // When no more data needs to be consumed, close the stream
          if (done) {
            controller.close();
            return;
          }
          // Enqueue the next data chunk into our target stream
          controller.enqueue(value);
          return pump();
        });
      }
    },
  });

  return new Response(stream);
}
