const products = [
    {
      products: [
        {
          name: "Regular",
          type: "year",
          price: "30.00",
          productId: "price_1OtBza2Lz1M9wQje8JEjYFDT",
          description: [
            "Voting in general meetings",
            "Eligibility to hold office",
            "Participation in association events",
          ],
          active: true
        },
        {
          name: "Student",
          type: "year",
          price: "15.00",
          productId: "price_1OtC022Lz1M9wQjepmn6CSB7",
          description: [
            "Voting in general meetings",
            "Eligibility to hold office",
            "Participation in association events",
          ],
          active: true
        },
        {
          name: "Corporate",
          type: "year",
          price: "100.00",
          productId: "price_1OtC0d2Lz1M9wQjeI6oO9w3e",
          description: [
            "Voting in general meetings",
            "Eligibility to hold office",
            "Participation in association events",
          ],
          active: true
        }
      ]
    },
    
    ]
    
    export function ProductCard({ selectedPlan, product }) {
      if (product.active) {
        return (
          <div
            className={`p-10 mb-5 border-2 hover:cursor-pointer ${
              selectedPlan.plan === product.productId
                ? "-translate-y-2 text-indigo-600"
                : "hover:-translate-y-2 hover:text-indigo-600"
            } transition-all w-full mt-10 pt-10 max-w-[20rem] min-h-[10rem] bg-white shadow-2xl rounded-md`}
            onClick={() => selectedPlan.setPlan(product.productId)}
          >
            <div className="font-bold text-3xl mb-2 capitalize">
              {product.name} Plan
            </div>
            <div className="flex items-baseline mb-2">
              <div className="text-3xl mr-2">${product.price}</div> Per{" "}
              {product.type}
            </div>
            <ul className="list-disc pl-4 ">
             {product.description.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
            </ul>
          </div>
        )
      }
      return (
        <div
          className={`border-2 border-neutral-400 text-gray-800 w-full max-w-[21rem] min-h-[10rem] bg-white shadow-2xl rounded-md`}
        >
          <div className="font-bold text-3xl mb-2">
            {product.name} Plan
          </div>
          <div className="flex items-baseline mb-2">
            <div className="text-3xl mr-2">${product.price}</div> Per {product.type}
          </div>
          <ul className="list-disc pl-4 ">
            {product.description.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
          </ul>
        </div>
      )
    }
    
    export default function PricingTable({ selectedPlan}) {
      return (
        <>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {products[0].products.map((product, index) => (
                  <ProductCard
                    selectedPlan={selectedPlan}
                    product={product}
                    key={index}
                  />
                ))
             }
          </div>
        </>
      )
    }