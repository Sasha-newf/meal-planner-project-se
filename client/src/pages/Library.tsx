import { useNavigate } from "react-router-dom";
import { BookOpen, Bookmark } from "lucide-react";

export default function Library() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-w-0">
      <header className="bg-white border border-gray-100 rounded-3xl px-6 md:px-8 py-6 mb-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Recipes</h1>
        <p className="text-sm text-gray-400 mt-1">
          Choose your posted or saved recipes
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/library/posted")}
          className="bg-white border border-gray-100 rounded-3xl p-8 text-left shadow-sm hover:shadow-md hover:border-green-200 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-5">
            <BookOpen size={24} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            Posted Recipes
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Recipes you created and shared
          </p>
        </button>

        <button
          onClick={() => navigate("/library/saved")}
          className="bg-white border border-gray-100 rounded-3xl p-8 text-left shadow-sm hover:shadow-md hover:border-green-200 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mb-5">
            <Bookmark size={24} />
          </div>

          <h2 className="text-xl font-semibold text-gray-900">
            Saved Recipes
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Recipes you saved for later
          </p>
        </button>
      </div>
    </div>
  );
}