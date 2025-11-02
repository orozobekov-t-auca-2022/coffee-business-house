import type { Product } from "../types/product"

interface ModalProps {
    obj: Product;
    image: string;
    onClose: () => void;
}

function Modal({ obj, image, onClose }: ModalProps) {



    
    const sizes = obj.sizes?.map((size) => `
        <div className="size-option">
            <input type="radio" id="size-${size}" name="size" value="${size}">
            <label for="size-${size}">${size} ml</label>
        </div>
    `).join('') || '';
    return <>
        <div className="modal">
            <div className="modal-content">
                <img src={`${image}`} alt=""/>
                <div className="modal-text">
                    <h3>{obj['name']}</h3>
                    <p>{obj['description']}</p>
                    <label>Size</label>
                    {/* <div className="sizes">
                        ${sizes}
                    </div>
                    <label>Additives</label>
                    <div className="additives">
                        ${additives}
                    </div> */}
                    <div className="modal-price">
                        <h3>Total:</h3>
                        {/* <h3 className="modal-price-text">$${parseFloat(totalPrice.toString()).toFixed(2)}</h3> */}
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
                <button className="close-modal-button">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.34326 1.34314L12.657 12.6568" stroke="#E1D4C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.34326 12.6569L12.657 1.34315" stroke="#E1D4C9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    </>
}

export default Modal