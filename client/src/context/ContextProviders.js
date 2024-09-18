import { PopupMapProvider } from "./PopupMapContext";

const ContextProviders = ({ children }) => {
    return (
        <PopupMapProvider>
            { children }
        </PopupMapProvider>
    )
}

export default ContextProviders;