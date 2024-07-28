document.addEventListener('DOMContentLoaded', function() {
    // Lấy thông tin từ URL hoặc localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const fullName = urlParams.get('fullName') || localStorage.getItem('numerologyFullName');
    const dateOfBirth = urlParams.get('dateOfBirth') || localStorage.getItem('numerologyDateOfBirth');

    // Xóa thông tin khỏi localStorage sau khi đã sử dụng
    localStorage.removeItem('numerologyFullName');
    localStorage.removeItem('numerologyDateOfBirth');

    if (fullName && dateOfBirth) {
        // Gọi API
        const proxyUrl = `/.netlify/functions/api?fullName=${encodeURIComponent(fullName)}&dateOfBirth=${encodeURIComponent(dateOfBirth)}`;
        
        fetch(proxyUrl)
            .then(response => response.json())
            .then(data => {
                displayResult(data);
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('result').innerHTML = 'Đã xảy ra lỗi khi phân tích. Vui lòng thử lại sau.';
            });
    } else {
        document.getElementById('result').innerHTML = 'Không có thông tin để phân tích.';
    }
});

function formatContent(content) {
    if (!content) return 'Không có thông tin';

    let formattedContent = '';
    let parts = content.split(/(\r?\n|\r)/);

    parts.forEach(part => {
        part = part.trim();
        if (part.startsWith('▪') || part.startsWith('+')) {
            formattedContent += `<p class="bullet-point" data-bullet="${part[0]}">${part.substring(1).trim()}</p>`;
        } else if (part.startsWith('###') && part.endsWith('###')) {
            let innerText = part.substring(3, part.length - 3).trim();
            formattedContent += `<p class="highlighted-text">${innerText}</p>`;
        } else if (part) {
            formattedContent += `<p>${part}</p>`;
        }
    });

    return formattedContent;
}

function displayResult(data) {
    let resultHtml = '<h2>Kết quả phân tích thần số học</h2>';
    resultHtml += `<p><strong>Họ và tên:</strong> ${data.hoVaTen || 'Không có thông tin'}</p>`;
    resultHtml += `<p><strong>Ngày sinh:</strong> ${data.ngaySinh || 'Không có thông tin'}</p>`;
    
    const numberNames = {
        linhHon: 'Số Linh hồn',
        nhanCach: 'Số Nhân cách',
        suMenh: 'Số Sứ mệnh',
        thaiDo: 'Số Thái độ',
        tenRieng: 'Số Tên riêng',
        ngaySinh: 'Số Ngày sinh',
        duongDoi: 'Số Đường đời',
        truongThanh: 'Số Trưởng thành',
        noiCam: 'Số Nội cảm',
        theHe: 'Số Thế hệ',
        lap: 'Số Lặp',
        boSung: 'Số Bổ sung',
        canBang: 'Số Cân bằng',
        nghiep: 'Số Nghiệp',
        thieu: 'Số Thiếu',
        tuDuyLogic: 'Số Tư duy Logic',
        tuDuyCamXuc: 'Số Tư duy Cảm xúc',
        tuDuyTraiNghiem: 'Số Tư duy Trải nghiệm',
        tuDuyTrucGiac: 'Số Tư duy Trực giác',
        tinhCachBamSinh: 'Số Tính cách Bẩm sinh',
        phanHoiTiemThuc: 'Số Phản hồi Tiềm thức',
        diemBaoMat: 'Số Điểm Bảo mật'
    };


    
    // Hiển thị các con số
    for (const [key, name] of Object.entries(numberNames)) {
        if (data.cacConSo[key]) {
            const value = data.cacConSo[key];
            resultHtml += `
                <div class="number-section">
                    <h3>${name}: ${value.giaTri || 'Không có thông tin'}</h3>
                    <p>${formatContent(value.noiDung) || 'Không có thông tin'}</p>
                    ${key === 'duongDoi' && value.khaNangTuongThich ? `<p><strong>Khả năng tương thích:</strong> ${formatContent(value.khaNangTuongThich)}</p>` : ''}
                </div>
            `;
        }
    }


    // Hiển thị các chặng đường đời
    resultHtml += '<h3>Các chặng đường đời</h3>';
    data.cacChangDuongDoi.forEach((stage, index) => {
        resultHtml += `
            <div class="stage-section">
                <h4>Chặng ${index + 1}</h4>
                <p><strong>Độ tuổi:</strong> ${stage.doTuoi || 'Không có thông tin'}</p>
                <p><strong>Khoảng năm:</strong> ${stage.khoangNam || 'Không có thông tin'}</p>
                <p><strong>Giá trị:</strong> ${stage.giaTri || 'Không có thông tin'}</p>
                <p>${formatContent(stage.noiDung) || 'Không có thông tin'}</p>
            </div>
        `;
    });

    // Hiển thị thách thức
    resultHtml += '<h3>Thách thức</h3>';
    data.thachThuc.forEach((challenge, index) => {
        resultHtml += `
            <div class="challenge-section">
                <h4>Thách thức ${index + 1}</h4>
                <p><strong>Giá trị:</strong> ${challenge.giaTri || 'Không có thông tin'}</p>
                <p>${formatContent(challenge.noiDung) || 'Không có thông tin'}</p>
            </div>
        `;
    });


    // Hiển thị chu kỳ hàng năm
    resultHtml += '<h3>Chu kỳ hàng năm</h3>';
    data.chuKiHangNam.forEach((cycle, index) => {
        resultHtml += `
            <div class="cycle-section">
                <h4>Chu kỳ ${index + 1}</h4>
                <p><strong>Giá trị:</strong> ${cycle.giaTri || 'Không có thông tin'}</p>
                <p>${formatContent(cycle.noiDung) || 'Không có thông tin'}</p>
            </div>
        `;
    });
    
    // Hiển thị chu kỳ hàng tháng
    resultHtml += '<h3>Chu kỳ hàng tháng</h3>';
    data.chuKiHangThang.forEach((cycle, index) => {
        resultHtml += `
            <div class="monthly-cycle-section">
                <h4>Chu kỳ ${index + 1}</h4>
                <p><strong>Giá trị:</strong> ${cycle.giaTri || 'Không có thông tin'}</p>
                <p>${formatContent(cycle.noiDung) || 'Không có thông tin'}</p>
            </div>
        `;
    });

    document.getElementById('result').innerHTML = resultHtml;
}