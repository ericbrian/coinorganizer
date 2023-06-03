import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {

  return (
    <div>
      {
        Array.from({ length: 4 }, (_, i) => i + 1).map((id) =>
          <div key={id} className="m-24 rounded-md grid grid-cols-2 gap-12">
            <Skeleton className="h-6 w-1/5 bg-gray-20" />
            <div className="w-4/5"></div>
          </div>
        )
      }
    </div>
  )
}

