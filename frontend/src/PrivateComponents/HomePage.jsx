import { useEffect } from "react";
import { useProductStore } from "./useProductStore";
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react";
import ProductCard from "./ProductCard";
import AddProductModal from "./AddProductModal";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 bg-black text-white">
      <div className="flex justify-between items-center mb-8">
      <button
  className="btn bg-[#282A36] text-white hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full shadow-lg px-6 py-3 flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
  onClick={() => document.getElementById("add_product_modal").showModal()}
>
  <PlusCircleIcon className="w-5 h-5" />
  <span className="font-semibold">Add Product</span>
</button>

        <button className="btn btn-ghost btn-circle text-white hover:bg-gray-700 rounded-full transition-all duration-300" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <AddProductModal />

      {error && <div className="alert alert-error mb-8 text-red-500">{error}</div>}

      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-gray-800 rounded-full p-6 shadow-lg">
            <PackageIcon className="size-12 text-white" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold text-white">No products found</h3>
            <p className="text-gray-400 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg text-white" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" />
          ))}
        </div>
      )}
    </main>
  );
}

export default HomePage;