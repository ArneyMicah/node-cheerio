// // 螺旋形二维数组
// const spiralMatrix = (n) => {
//     const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
//     let count = 1;
//     let startRow = 0;
//     let endRow = n - 1;
//     let startCol = 0;
//     let endCol = n - 1;
//     while (startRow <= endRow && startCol <= endCol) {
//         for (let i = startCol; i <= endCol; i++) {
//             matrix[startRow][i] = count;
//             count++;
//         }
//         startRow++;
//         for (let i = startRow; i <= endRow; i++) {
//             matrix[i][endCol] = count;
//             count++;
//         }
//         endCol--;
//         for (let i = endCol; i >= startCol; i--) {
//             matrix[endRow][i] = count;
//             count++;
//         }
//         endRow--;
//         for (let i = endRow; i >= startRow; i--) {
//             matrix[i][startCol] = count;
//             count++;
//         }
//         startCol++;
//     }
//     return matrix;
// };
// console.log(spiralMatrix(6));
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(`你叫什么名字?`, name => {
    console.log(`你好 ${name}!`)
    readline.close()
})