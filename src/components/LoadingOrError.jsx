// eslint-disable-next-line react/prop-types
export default function LoadingOrError({ error }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-xl" data-testid="LoadingOrError">
        {error ? error.message : ""}
      </h1>
    </div>
  );
}
LoadingOrError.defaultProps = {
  error: undefined,
};
