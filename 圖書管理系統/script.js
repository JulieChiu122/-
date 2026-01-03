let nextId = 1;

function addBook(){
    const bookName = document.getElementById('bookName').value.trim();
    const writer = document.getElementById('writer').value.trim();
    const bookYear = document.getElementById('bookYear').value;

    if (!bookName || !writer || !bookYear){
        alert('請先輸入資料');
        return;
    }
    const table = document.getElementById('dataTable');
    const row = table.insertRow();

    row.innerHTML = `
        <td>${nextId++}</td>
        <td class="editable">${bookName}</td>
        <td class="editable">${writer}</td>
        <td class="editable">${bookYear}</td>
        <td><button class="delete-btn">刪除</button></td>
        <td><button class="edit-btn">修改</button></td>
    `;

    // 刪除
    row.querySelector('.delete-btn').onclick = () => {
        if (confirm('確定要刪除?')){
            row.remove();
            const table = document.getElementById('dataTable');
            if (table.rows.length == 1){
                nextId = 1;
            }
        }
    };

    // 修改
    const editBtn = row.querySelector('.edit-btn');
    editBtn.onclick = () => {
        const editableCells = row.querySelectorAll('.editable');
        
        if (editBtn.textContent === '修改') {
            editableCells.forEach((cell, index) => {
                const type = index === 2 ? 'number' : 'text'; // 第三個欄位是年份
                cell.innerHTML = `<input type="${type}" value="${cell.textContent}" min="0" >`;
            });
            editBtn.textContent = '保存';
        } else {
            editableCells.forEach(cell => {
                cell.textContent = cell.querySelector('input').value;
            });
            editBtn.textContent = '修改';
            alert('已保存!')
        }
    };

    ['bookName', 'writer', 'bookYear'].forEach(id => document.getElementById(id).value = "");


}
