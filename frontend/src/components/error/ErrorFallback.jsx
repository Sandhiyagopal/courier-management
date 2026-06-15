export default function ErrorFallback({
  error,
  resetErrorBoundary,
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">
        Something went wrong
      </h1>

      <p className="mb-4 text-red-500">
        {error?.message}
      </p>

      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}