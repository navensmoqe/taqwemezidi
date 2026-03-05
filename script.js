// بيانات الأعياد والمناسبات من الصورة
const eventsList = [
    { event: "يبدأ الأربعين الشتوي", day: "الأربعاء", dateStr: "17 - 12 - 2025", dateVal: "2025-12-17" },
    { event: "يبدأ صيام الباتزمي", day: "الأحد", dateStr: "28 - 12 - 2025", dateVal: "2025-12-28" },
    { event: "عيد الباتزمي", day: "السبت", dateStr: "3 - 1 - 2026", dateVal: "2026-01-03" },
    { event: "عيد الأربعين الشتوي", day: "الاحد", dateStr: "25 - 1 - 2026", dateVal: "2026-01-25" },
    { event: "شهڤ به رات", day: "مساء الاحد", dateStr: "31 - 1 / 1 - 2 - 2026", dateVal: "2026-02-01" }, // Ends on Feb 1
    { event: "يبدأ صيام خدر الياس", day: "الاثنين - الثلاثاء - الأربعاء", dateStr: "9 - 10 - 11 - 2 - 2026", dateVal: "2026-02-11" }, // Ends on Feb 11
    { event: "عيد خدر الياس", day: "الخميس", dateStr: "12 - 2 - 2026", dateVal: "2026-02-12" },
    { event: "عيد أربعاء نيسان", day: "الأربعاء", dateStr: "8 - 4 - 2026", dateVal: "2026-04-08" },
    { event: "عيد شيخالي شمسا", day: "الأربعاء", dateStr: "15 - 1 - 2026", dateVal: "2026-04-15" },
    { event: "عيد بوقذار", day: "الجمعة", dateStr: "8 - 5 - 2026", dateVal: "2026-05-08" },
    { event: "عيد الحج (الكبير)", day: "الأحد", dateStr: "24 - 5 - 2026", dateVal: "2026-05-24" },
    { event: "يبدأ الأربعين الصيفي", day: "الثلاثاء", dateStr: "16 - 6 - 2026", dateVal: "2026-06-16" },
    { event: "عيد الأربعين الصيفي", day: "السبت", dateStr: "25 - 7 - 2026", dateVal: "2026-07-25" },
    { event: "صيام سلتان ايزي", day: "الثلاثاء - الأربعاء - الخميس", dateStr: "8 - 9 - 10 - 12 - 2026", dateVal: "2026-12-10" },
    { event: "عيد الصيام", day: "الجمعة", dateStr: "11 - 12 - 2026", dateVal: "2026-12-11" }
];

// تصحيح الخطأ المطبعي في عيد شيخالي شمسا 
eventsList[8].dateStr = "15 - 4 - 2026";

document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('calendar-body');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let upcomingFound = false;

    eventsList.forEach(item => {
        // إنشاء كائن التاريخ الفعلي للمقارنة
        const itemDate = new Date(item.dateVal);
        itemDate.setHours(0, 0, 0, 0);

        let statusHtml = '';
        let rowClass = '';

        if (itemDate < today) {
            statusHtml = '<span class="status past">انتهى</span>';
            rowClass = 'past-event';
        } else if (!upcomingFound && itemDate >= today) {
            statusHtml = '<span class="status upcoming">القادم</span>';
            rowClass = 'upcoming-event';
            upcomingFound = true;
        } else {
            statusHtml = '<span class="status future">قادم</span>';
        }

        const tr = document.createElement('tr');
        if (rowClass) tr.className = rowClass;

        tr.innerHTML = `
            <td>${item.event}</td>
            <td>${item.day}</td>
            <td>${item.dateStr}</td>
            <td class="status-cell">${statusHtml}</td>
        `;

        tbody.appendChild(tr);
    });

    drawSun();
});

// رسم رمز الشمس الخاص بالتقويم
function drawSun() {
    const sunContainer = document.getElementById('sun-svg');
    if (!sunContainer) return;

    // عدد أشعة الشمس (21 شعاع - رمز تاريخي مهم)
    const rayCount = 21;
    let rays = '';

    for (let i = 0; i < rayCount; i++) {
        let angle = (i * 360) / rayCount;
        rays += `<polygon points="50,15 47,0 53,0" fill="#FFD700" transform="rotate(${angle} 50 50)" />`;
    }

    sunContainer.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <circle cx="50" cy="50" r="18" fill="#FFD700" />
            <circle cx="50" cy="50" r="21" fill="none" stroke="#FFD700" stroke-width="1" opacity="0.5" />
            ${rays}
        </svg>
    `;
}
