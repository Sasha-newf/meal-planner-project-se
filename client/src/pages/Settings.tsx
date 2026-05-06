import { useEffect, useState } from "react";
import { Camera, Save } from "lucide-react";
import api from "../api/client";

export default function Settings() {
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    avatarUrl: "",
    preferredUnits: "metric",
    preferredIngredients: "",
    avoidedIngredients: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/settings").then((res) => {
      setForm({
        email: res.data.email || "",
        nickname: res.data.nickname || "",
        avatarUrl: res.data.avatarUrl || "",
        preferredUnits: res.data.preferredUnits || "metric",
        preferredIngredients: res.data.preferredIngredients?.join(", ") || "",
        avoidedIngredients: res.data.avoidedIngredients?.join(", ") || "",
      });
    });
  }, []);

  async function saveSettings() {
    setIsSaving(true);
    setSaved(false);

    await api.put("/settings", {
      nickname: form.nickname,
      avatarUrl: form.avatarUrl,
      preferredUnits: form.preferredUnits,
      preferredIngredients: form.preferredIngredients
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      avoidedIngredients: form.avoidedIngredients
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    });

    setIsSaving(false);
    setSaved(true);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account and meal planning preferences.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Account
          </h2>

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-green-50 border border-green-100 flex items-center justify-center overflow-hidden">
              {form.avatarUrl ? (
                <img
                  src={form.avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="text-green-600" size={30} />
              )}
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  value={form.email}
                  disabled
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nickname
                </label>
                <input
                  placeholder="Your nickname"
                  value={form.nickname}
                  onChange={(e) =>
                    setForm({ ...form, nickname: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar URL
                </label>
                <input
                  placeholder="https://example.com/avatar.jpg"
                  value={form.avatarUrl}
                  onChange={(e) =>
                    setForm({ ...form, avatarUrl: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-gray-100" />

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Meal preferences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Measurement units
              </label>
              <select
                value={form.preferredUnits}
                onChange={(e) =>
                  setForm({ ...form, preferredUnits: e.target.value })
                }
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-white outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400"
              >
                <option value="metric">Metric: g, kg, ml, l</option>
                <option value="imperial">Imperial: oz, lb, cups</option>
              </select>
            </div>

            <div />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred ingredients
              </label>
              <textarea
                placeholder="chicken, rice, tomatoes"
                value={form.preferredIngredients}
                onChange={(e) =>
                  setForm({
                    ...form,
                    preferredIngredients: e.target.value,
                  })
                }
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none resize-none focus:ring-2 focus:ring-green-100 focus:border-green-400"
              />
              <p className="text-xs text-gray-400 mt-2">
                Separate ingredients with commas.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avoided ingredients
              </label>
              <textarea
                placeholder="peanuts, mushrooms, onions"
                value={form.avoidedIngredients}
                onChange={(e) =>
                  setForm({
                    ...form,
                    avoidedIngredients: e.target.value,
                  })
                }
                rows={4}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none resize-none focus:ring-2 focus:ring-green-100 focus:border-green-400"
              />
              <p className="text-xs text-gray-400 mt-2">
                These can later be used to filter recipes.
              </p>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between pt-2">
          {saved ? (
            <p className="text-sm text-green-600 font-medium">
              Settings saved successfully.
            </p>
          ) : (
            <div />
          )}

          <button
            onClick={saveSettings}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-500 text-white font-medium hover:bg-green-600 disabled:opacity-60 transition-all"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </div>
    </div>
  );
}