document.getElementById('numerologyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    
    // Lưu thông tin vào localStorage
    localStorage.setItem('numerologyFullName', fullName);
    localStorage.setItem('numerologyDateOfBirth', dateOfBirth);

    // URL cho trang kết quả
    const resultPageUrl = `/numerology/?fullName=${encodeURIComponent(fullName)}&dateOfBirth=${encodeURIComponent(dateOfBirth)}`;

    // Chuyển hướng đến trang kết quả
    window.location.href = resultPageUrl;
});