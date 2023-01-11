/**
 * 使用span标签包裹内容，然后计算span的宽度 width： px
 * @param valArr
 */
 function getTextWidth(str) {
    let padding = 20;//单元格左右padding距离
    let width = 0;
    let span = document.createElement('span');
    span.innerText = str;
    span.className = 'getwidth';
    document.querySelector('body').appendChild(span);
    // 这里可以获取当前单元格的font-size 以及 内容的中英文、字母等  做更精确的计算
    width = document.querySelector('.getwidth').offsetWidth+padding;
    document.querySelector('.getwidth').remove();
    return width;
}

/**
* 遍历列的所有内容，获取最宽一列的宽度
* @param {Array} arr 需要计算的数据
* @param {Number} minwidth 列最小宽度
*/
function getMaxLength (arr,minwidth=55) {
    return arr.reduce((acc, item) => {
        if (item) {
            let calcLen = getTextWidth(item);
            if (acc < calcLen) {
                acc = calcLen;
            }
        }
        return acc<minwidth?minwidth:acc;
    }, 0)
}

/**
* @description 计算列表列宽（把内容撑开）
* @param {Array} columns 列的数组
* @param {Array} tableArr 列表的数组
* */
export function calcColumnsWidth(columns, tableArr) {
    columns.forEach((item) => {
        const arr = tableArr.map((x) => x[item.prop]);
        arr.push(item.label); // 把每列的表头也加进去算
        item.width = getMaxLength(arr);
    });
    return columns;
}


