import{r,j as e,R as h,f as g}from"./index-DVIwUDIM.js";const j=({productId:l,isOpen:c,onClose:i})=>{const[o,n]=r.useState(!1),[x,d]=r.useState(""),[t,m]=r.useState();return r.useEffect(()=>{(async()=>{if(!(!l||!c)){n(!0);try{const a=await g(l);m(a)}catch{d("Failed to fetch product details")}finally{n(!1)}}})()},[l,c]),!c||!t||o?e.jsx("div",{children:"Loading..."}):x?e.jsx("div",{children:x}):h.createPortal(e.jsx("div",{className:"fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50",onClick:i,children:e.jsxs("div",{className:"bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg relative flex flex-col sm:flex-row",onClick:s=>s.stopPropagation(),children:[e.jsx("button",{className:"absolute top-2 right-2 text-xl text-gray-500 bg-white",onClick:i,children:"×"}),e.jsx("div",{className:"flex-shrink-0 w-full self-center  sm:w-1/2 p-4",children:e.jsx("img",{src:t.thumbnail,alt:t.title,className:"w-full h-72 object-contain rounded-lg"})}),e.jsxs("div",{className:"flex-grow w-full sm:w-1/2 p-4",children:[e.jsx("h3",{className:"text-2xl font-semibold text-gray-800 mb-2",children:t.title}),e.jsxs("p",{className:"text-lg text-gray-600 mb-2",children:["Price: ",e.jsxs("span",{className:"text-green-600",children:["$",t.price]})]}),e.jsxs("p",{className:"text-sm text-gray-500 mb-4",children:["Category: ",t.category]}),e.jsx("p",{className:"text-gray-700 mb-4",children:t.description}),e.jsxs("p",{className:"text-sm text-gray-700 mb-2",children:[e.jsx("strong",{children:"Brand:"})," ",t.brand]}),e.jsxs("p",{className:"text-sm text-gray-700 mb-2",children:[e.jsx("strong",{children:"Warranty:"})," ",t.warrantyInformation]}),e.jsxs("p",{className:"text-sm text-gray-700 mb-2",children:[e.jsx("strong",{children:"Return Policy:"})," ",t.returnPolicy]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("h4",{className:"font-semibold  text-gray-900",children:"Customer Reviews:"}),t.reviews.slice(0,2).map((s,a)=>e.jsxs("div",{className:"border-t mt-2",children:[e.jsxs("p",{className:"text-sm text-gray-800",children:[e.jsxs("strong",{children:[s.reviewerName,":"]})," ",s.comment]}),e.jsxs("p",{className:"text-sm text-gray-600",children:["Rating: ",s.rating,"/5"]})]},a))]})]})]})}),document.body)};export{j as default};
