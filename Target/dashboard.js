const dashboardCanvas = document.getElementById("dashboardCanvas");
const dashboardCtx = dashboardCanvas.getContext("2d");


dashboardCanvas.height = 220; 

function drawDashboard(data) {
    // Clear the entire canvas first
    dashboardCtx.clearRect(0, 0, dashboardCanvas.width, dashboardCanvas.height);

    // Set background to white or another color
    dashboardCtx.fillStyle = "black"; 
    dashboardCtx.fillRect(0, 0, dashboardCanvas.width, dashboardCanvas.height);

    const {
        distanceToTarget,
        speed,
        fitnessScore,
        totalTime,
        collisionStatus,
        posX,
        posY
    } = data;

    dashboardCtx.fillStyle = "white";
    dashboardCtx.font = "20px Arial"; // Increase the font size for the title
    dashboardCtx.fontWeight = "bold"; // Make the title bold

    // Draw the title
    dashboardCtx.fillText("Performance Dashboard", 10, 25);

    // Reset the font for the rest of the dashboard elements
    dashboardCtx.font = "16px Arial";
    dashboardCtx.fontWeight = "normal";

    const distanceToTargetY = 60;
    dashboardCtx.fillText("Distance to Target:", 10, distanceToTargetY);
    dashboardCtx.fillText(distanceToTarget, 150, distanceToTargetY);

    dashboardCtx.fillText("Speed: " + speed + " m/s", 10, distanceToTargetY + 30);
    dashboardCtx.fillText("Fitness Score: " + fitnessScore, 10, distanceToTargetY + 60);
    dashboardCtx.fillText("Total Time: " + totalTime + " s", 10, distanceToTargetY + 90);
    dashboardCtx.fillText("Collision Status: " + collisionStatus, 10, distanceToTargetY + 120);
    dashboardCtx.fillText("Position: (" + posX + ", " + posY + ")", 10, distanceToTargetY + 150);


}