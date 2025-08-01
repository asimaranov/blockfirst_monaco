function installPrismaWasmShim() {
  if (
    typeof process === "undefined" ||
    process.env.NEXT_RUNTIME !== "nodejs" ||
    process.env.NODE_ENV !== "production"
  ) {
    return;
  }

  try {
    const req: NodeRequire = eval("require"); // hide from webpack
    const path = req("node:path") as typeof import("node:path");
    const { createRequire, Module } = req(
      "node:module"
    ) as typeof import("node:module");

    const serverJs = path.join(process.cwd(), ".next/standalone/server.js");
    const standaloneRequire = createRequire(serverJs);

    const wasmPath = standaloneRequire.resolve(
      "@prisma/client/runtime/query_compiler_bg.postgresql.wasm"
    );

    const origResolveFilename = (Module as any)._resolveFilename;
    (Module as any)._resolveFilename = function (
      request: string,
      parent: any,
      isMain: boolean,
      options: any
    ) {
      if (
        request === "@prisma/client/runtime/query_compiler_bg.postgresql.wasm"
      ) {
        return wasmPath;
      }
      return origResolveFilename.call(this, request, parent, isMain, options);
    };

    console.log("Prisma WASM shim active:", wasmPath);
  } catch (e) {
    console.warn("Failed to install Prisma WASM shim", e);
  }
}

export function register() {
  installPrismaWasmShim();
}
