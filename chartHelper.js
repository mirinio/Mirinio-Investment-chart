    async function getLocalData()
    {
        var data = { 
            dataName: 'N/A',
            closes: [], 
            changes: [], 
            ema_50: [],
            dates: []};

        try {
            let contentBuffer = await readFileAsync(fileInput.files[0]);
        
            const table = contentBuffer.split('\n').slice(1);
            
            table.forEach(row => {
                const columns = row.split(';');
                data.dates.push(columns[3]);
                data.closes.push(columns[7]);
                data.changes.push(columns[8]);
            });

        } catch (err) {
            console.log(err);
        }

        return data;
    }

    async function createChart(){
        
        var data = await getLocalData();
        
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.dates,
            datasets: [{
                label: data.dataName,
                data: data.changes,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values){
                            return '$' + value
                        }
                    }
                }]
            },
            plugins: {
                zoom: {
                    // Container for pan options
                    pan: {
                        // Boolean to enable panning
                        enabled: true,
    
                        // Panning directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow panning in the y direction
                        mode: 'xy'
                    },
    
                    // Container for zoom options
                    zoom: {
                        // Boolean to enable zooming
                        enabled: true,
    
                        // Zooming directions. Remove the appropriate direction to disable 
                        // Eg. 'y' would only allow zooming in the y direction
                        mode: 'xy',
                    }
                }
            }
        }
    });
    }

    function readFileAsync(file){
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = reject;
            reader.readAsText(file);
        });
    }