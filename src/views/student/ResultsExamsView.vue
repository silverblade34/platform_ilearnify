<template>
    <h1 class="font-bold text-xl text-gray-500 title-views">Mis calificaciones</h1>
    <div class="py-5">
        <div class="charts doughnutChart">
            <h4 class="pb-3 font-semibold">GLNS Abastecidos</h4>
        </div>
    </div>
</template>
<script>

// Agrupar por curso y calcular promedios
const groupedData = data.reduce((acc, curr) => {
    const course = curr.course_title;

    if (!acc[course]) {
        acc[course] = {
            total_correct_answers: 0,
            total_wrong_answers: 0,
            total_score: 0,
            count: 0
        };
    }

    acc[course].total_correct_answers += curr.correct_answers;
    acc[course].total_wrong_answers += curr.wrong_answers;
    acc[course].total_score += parseFloat(curr.total_score);
    acc[course].count += 1;

    return acc;
}, {});

// Calcular promedios
const result = Object.keys(groupedData).map(course => {
    const courseData = groupedData[course];
    return {
        course_title: course,
        average_correct_answers: courseData.total_correct_answers / courseData.count,
        average_wrong_answers: courseData.total_wrong_answers / courseData.count,
        average_total_score: courseData.total_score / courseData.count
    };
});

console.log(result);
</script>