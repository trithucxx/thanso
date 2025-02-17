document.getElementById('numerologyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;
    
    const proxyUrl = `http://localhost:3000/proxy?fullName=${encodeURIComponent(fullName)}&dateOfBirth=${encodeURIComponent(dateOfBirth)}`;
    
    fetch(proxyUrl)
        .then(response => response.json())
        .then(data => {
            displayResult(data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerHTML = 'Đã xảy ra lỗi khi phân tích. Vui lòng thử lại sau.';
        });
});

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
                    <p>${value.noiDung || 'Không có thông tin'}</p>
                    ${key === 'duongDoi' && value.khaNangTuongThich ? `<p><strong>Khả năng tương thích:</strong> ${value.khaNangTuongThich}</p>` : ''}
                </div>
            `;
        }
    }

    // Hiển thị chu kỳ hàng năm
    resultHtml += '<h3>Chu kỳ hàng năm</h3>';
    data.chuKiHangNam.forEach((cycle, index) => {
        resultHtml += `
            <div class="cycle-section">
                <h4>Chu kỳ ${index + 1}</h4>
                <p><strong>Giá trị:</strong> ${cycle.giaTri || 'Không có thông tin'}</p>
                <p>${cycle.noiDung || 'Không có thông tin'}</p>
            </div>
        `;
    });

    // Hiển thị các chặng đường đời
    resultHtml += '<h3>Các chặng đường đời</h3>';
    data.cacChangDuongDoi.forEach((stage, index) => {
        resultHtml += `
            <div class="stage-section">
                <h4>Chặng ${index + 1}</h4>
                <p><strong>Độ tuổi:</strong> ${stage.doTuoi || 'Không có thông tin'}</p>
                <p><strong>Khoảng năm:</strong> ${stage.khoangNam || 'Không có thông tin'}</p>
                <p><strong>Giá trị:</strong> ${stage.giaTri || 'Không có thông tin'}</p>
                <p>${stage.noiDung || 'Không có thông tin'}</p>
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
                <p>${challenge.noiDung || 'Không có thông tin'}</p>
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
                <p>${cycle.noiDung || 'Không có thông tin'}</p>
            </div>
        `;
    });

    document.getElementById('result').innerHTML = resultHtml;
}