import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react";
import { useProductStore } from "./useProductStore";

function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();

  return (
    <dialog id="add_product_modal" className="modal modal-open modal-box rounded-lg shadow-xl bg-[#282A36] p-6 max-w-lg w-full">
      <div className="modal-box rounded-lg shadow-xl bg-[#282A36] p-6 max-w-lg w-full">
        {/* CLOSE BUTTON */}
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-white hover:text-gray-300">
            X
          </button>
        </form>

        {/* MODAL HEADER */}
        <h3 className="text-xl font-semibold text-white text-center mb-8">Add New Product</h3>

        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            {/* PRODUCT NAME INPUT */}
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-300">Product Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Package2Icon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full pl-10 py-3 rounded-lg shadow-sm bg-[#383C4A] text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* PRODUCT PRICE INPUT */}
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-300">Price</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <DollarSignIcon className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10 py-3 rounded-lg shadow-sm bg-[#383C4A] text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            {/* PRODUCT IMAGE INPUT */}
            <div className="form-control">
              <label className="label text-sm font-medium text-gray-300">Image URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full pl-10 py-3 rounded-lg shadow-sm bg-[#383C4A] text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* MODAL ACTIONS */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="btn btn-ghost w-24 text-gray-300 hover:text-gray-400"
              onClick={() => document.getElementById("add_product_modal").close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary w-36 rounded-lg shadow-lg text-white disabled:opacity-50 transition-all duration-300"
              disabled={!formData.name || !formData.price || !formData.image || loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

    </dialog>
  );
}

export default AddProductModal;
