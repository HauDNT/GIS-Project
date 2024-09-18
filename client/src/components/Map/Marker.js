import { useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { usePopupContext } from '../../context/PopupMapContext';
import MarkerPopup from './MarkerPopup';

const Marker = ({ id, currentMap, longitude, latitude, onClick }) => {
    const markerRef = useRef();
    const popupRef = useRef();
    const { activeMarkerId, updatePopupContext } = usePopupContext();

    const createPopup = () => {
        // Tạo phần tử DOM cho Popup
        const popupElement = document.createElement('div');

        // Render component vào phần tử DOM
        ReactDOM.render(
            <MarkerPopup
                onClose={() => {
                    popupRef.current.remove();
                    updatePopupContext(null);
                }}
                data={{ latitude: latitude, longitude: longitude }}
            />,
            popupElement
        );

        // Sau đó tạo Popup
        const newPopup = new mapboxgl.Popup({
            closeOnClick: false,
            closeButton: false,
            offset: [0, -40],
            anchor: "bottom",
        })
            .setLngLat([longitude, latitude])
            .setDOMContent(popupElement)
            .addTo(currentMap);

        // Lưu popup vào ref
        popupRef.current = newPopup;

        setTimeout(() => {
            const popupElement = newPopup.getElement();
            popupElement.classList.add('open');
        }, 100);
    };

    const handleClick = () => {
        /*
        * Xử lý sự kiện:
        *   - Nếu hiện tại usePopupContext đã có lưu id của Marker:
        *       + Nếu id đó === với id hiện tại xảy ra sự kiện click 
        *           => Loại bỏ popup này khỏi map,
        *           => Xóa bỏ id khỏi usePopupContext.
        *       + Nếu id đó !== với id hiện tại xảy ra sự kiện click 
        *           => Loại bỏ popup cũ, 
        *           => Tạo popup mới -> hiển thị, 
        *           => Cập nhật lại cho usePopupContext.
        *   - Nếu hiện tại usePopupContext chưa lưu id nào: 
        *       + Tạo popup mới -> hiển thị,
        *       + Cập nhật id mới này cho usePopupContext.
        */

        if (popupRef.current) {
            popupRef.current.remove(); // Đóng popup nếu đã tồn tại
        }

        if (activeMarkerId === id) {
            updatePopupContext(null); // Nếu marker đang hoạt động, xóa id
        } else {
            createPopup(); // Tạo popup cho marker mới
            updatePopupContext(id); // Cập nhật id mới
        }
    };

    useEffect(() => {
        if (!currentMap) return;

        const marker = new mapboxgl
            .Marker()
            .setLngLat([longitude, latitude])
            .addTo(currentMap);

        markerRef.current = marker;

        marker.getElement().addEventListener('click', handleClick);

        // Cleanup khi component bị unmount hoặc khi marker thay đổi
        return () => {
            marker.getElement().removeEventListener('click', handleClick);
            marker.remove();  // Xóa marker khỏi map

            if (popupRef.current) {
                popupRef.current.remove(); // Xóa Popup
            }
        }
    }, [currentMap, longitude, latitude, id]);

    return null;
}

export default Marker;