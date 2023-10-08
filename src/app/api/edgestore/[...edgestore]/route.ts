import { initEdgeStore } from "@edgestore/server"
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app"
const es = initEdgeStore.create()
/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
  publicFiles: es
    .fileBucket({
      maxSize: 1024 * 1024 * 2, // 2MB
      accept: ["image/jpeg", "image/png", "image/jpg"],
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      console.log("beforeDelete", ctx, fileInfo)
      return true // allow delete
    }),
})
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
})
export { handler as DELETE, handler as GET, handler as POST }
/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter
