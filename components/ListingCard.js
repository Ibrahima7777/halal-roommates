// components/ListingCard.js
export default function ListingCard({ listing }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
      {/* Placeholder image */}
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No Image</span>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{listing.title}</h2>
        <p className="text-blue-600 font-bold">${listing.rent}/mo</p>
        <p className="text-gray-600 text-sm">{listing.address}</p>
        {listing.halalKitchen && (
          <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
            Halal Kitchen
          </span>
        )}
      </div>
    </div>
  )
}
