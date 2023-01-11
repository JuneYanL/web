// 今日的格式化日期
export function deaTimeToday() {
	const d = new Date()
	const d1 = d.getTime()
	return deaTime1(d1);
}

// 昨日的格式化日期
export function deaTime() {
	const d = new Date()
	const d1 = d.getTime() - 24 * 60 * 60 * 1000
	return deaTime1(d1);
}

// 根据毫秒格式化日期,不传则是当前的日期格式化
export function deaTime1(time) {
	const d = time?new Date(time):new Date();
	const year = d.getFullYear()
	const month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
	const data = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
	const HMS = year + '-' + month + '-' + data
	return HMS
}

// 返回n天前的格式化时间
export function deaTimeN(n) {
	const d = new Date()
	const d1 = d.getTime() - n * 24 * 60 * 60 * 1000
	return deaTime1(d1);
}
// 返回上个月的格式化年月
export function getMonth() {
	const d = new Date();//获取今日的日期
	let year = d.getFullYear();
	let month = d.getMonth();
	if(month ===0){
		year --;
		month = 12;
	} else if(month>0&&month<10) {
		month = '0'+month;
	};
	return year + '-' + month;
}