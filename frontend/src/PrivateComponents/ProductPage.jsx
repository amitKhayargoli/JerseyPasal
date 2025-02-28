import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "./useProductStore";
import { useEffect } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";

function ProductPage() {
  const {
    currentProduct,
    formData,
    setFormData,
    loading,
    error,
    fetchProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      navigate("/AdminDashboard");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="loading loading-spinner loading-lg text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 bg-black">
        <div className="alert alert-error text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-black text-white relative">
      <button
        onClick={() => navigate("/AdminDashboard")}
        className="absolute top-4 left-4 btn btn bg-[#282A36] text-white hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full shadow-lg px-6 py-3 flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {/* PRODUCT IMAGE */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-{#282A36}">
          <img
            src={currentProduct?.image}
            alt={currentProduct?.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* PRODUCT FORM */}
        <div className="card bg-[#282A36] shadow-lg p-6 rounded-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Edit Product</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(id);
              }}
              className="space-y-6"
            >
              {/* PRODUCT NAME */}
              <div className="form-control">
                <label className="label text-sm font-medium text-gray-300">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full pl-10 py-3 rounded-lg shadow-sm bg-[#383C4A] text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* PRODUCT PRICE */}
              <div className="form-control">
                <label className="label text-sm font-medium text-gray-300">
                  Price
                </label>
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

              {/* PRODUCT IMAGE URL */}
              <div className="form-control">
                <label className="label text-sm font-medium text-gray-300">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full pl-10 py-3 rounded-lg shadow-sm bg-[#383C4A] text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* FORM ACTIONS */}
              <div className="flex justify-between mt-8">
                <button type="button" onClick={handleDelete} className="btn bg-red-700 text-white hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full shadow-lg px-6 py-3 flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105">
                  <Trash2Icon className="w-5 h-5 mr-2" />
                  Delete Product
                </button>

                <button
                  type="submit"
                  className="btn bg-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full shadow-lg px-6 py-3 flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
                  disabled={loading || !formData.name || !formData.price || !formData.image}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;