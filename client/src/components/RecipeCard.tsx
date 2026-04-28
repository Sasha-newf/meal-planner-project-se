import { Clock, Users, Bookmark } from "lucide-react";

export default function RecipeCard({ post, onOpen, onToggleSave }: any) {
  return (
    <div
      onClick={onOpen}
      className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {post.imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-base font-semibold text-gray-900 leading-snug">
            {post.title}
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(post.id);
            }}
            className={`shrink-0 p-2 rounded-xl border transition-all ${
              post.isSaved
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-white border-gray-200 text-gray-400 hover:bg-gray-50"
            }`}
          >
            <Bookmark
              size={15}
              fill={post.isSaved ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          {post.recipe?.timeMinutes && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.recipe.timeMinutes} min
            </span>
          )}
          {post.recipe?.servings && (
            <span className="flex items-center gap-1">
              <Users size={12} />
              {post.recipe.servings} servings
            </span>
          )}
        </div>

        {post.recipe?.ingredients?.length > 0 && (
          <p className="text-xs text-gray-400 mb-3 line-clamp-1">
            {post.recipe.ingredients
              .slice(0, 4)
              .map((i: any) => i.name)
              .join(", ")}
          </p>
        )}

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}