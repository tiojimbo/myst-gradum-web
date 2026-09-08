import { Icon } from "@/components/ui/icon";

function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <Icon name="loader-4" size="feature" className="animate-spin text-graphite-400" />
    </div>
  );
}

export default Loading;
