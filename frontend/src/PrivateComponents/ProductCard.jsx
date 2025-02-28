import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "./useProductStore";

function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();
  return (
    <div className="bg-[#282A36] p-6 rounded-xl  shadow-lg text-white flex flex-col">
      {/* PRODUCT IMAGE */}
      <figure className="relative w-full h-0 pb-[56.25%] mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
        />
      </figure>

      <div className="card-body flex flex-col space-y-4">
        {/* PRODUCT INFO */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary text-[#38BDF8]">${Number(product.price).toFixed(2)}</p>

        {/* CARD ACTIONS */}
        <div className="flex justify-end gap-2 mt-4">
          <Link to={`/AdminDashboard/product/${product.id}`} className="btn btn-sm btn-info btn-outline text-[#098FCB]">
            <EditIcon className="w-4 h-4" />
          </Link>

          <button
            className="btn btn-sm btn-error btn-outline text-[#DA6073]"
            onClick={() => deleteProduct(product.id)}
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
