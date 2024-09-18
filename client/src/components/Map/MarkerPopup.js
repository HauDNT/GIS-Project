const MarkerPopup = ({ data, onClose }) => {
    return (
        <>
            <h3>Thông tin Marker</h3>
            <p>Kinh độ: {data.latitude}</p>
            <p>Vĩ độ: {data.longitude}</p>
            <button onClick={onClose}>Đóng</button>
        </>
    );
};

export default MarkerPopup;