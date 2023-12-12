$(document).ready(function () {
    let data;

    // Используем Ajax для загрузки данных с сервера
    $.ajax({
        url: 'http://localhost:3000/api/data',
        type: 'GET',
        dataType: 'json',
        success: function (responseData) {
            data = responseData;
            displayData(data);
            displayArtists(getUniqueArtists(data));
        },
        error: function (error) {
            console.log('Error loading data:', error);
        }
    });


    function displayData(data) {
        const tableBody = $('#musicTable tbody');
        tableBody.empty();


        data.forEach(item => {
            const row = $('<tr>');
            row.append($('<td>').text(item.id));
            row.append($('<td>').text(item.title));
            row.append($('<td>').text(item.artist));
            row.append($('<td>').text(item.genre));
            row.append($('<td>').text(item.year));
            tableBody.append(row);
        });
    }

    // Функция для отображения исполнителей в выпадающем списке
    function displayArtists(artists) {
        const selectElement = $("#artistFilter");


        selectElement.empty();

        // Добавляем каждого исполнителя в список
        artists.forEach(artist => {
            const option = $("<option>").text(artist).val(artist);
            selectElement.append(option);
        });
    }


    function getUniqueArtists(data) {
        const artists = data.map(item => item.artist);
        return [...new Set(artists)];
    }
    // Обработчик кнопки Filter
    $("#filterBtn").on("click", function () {
        const selectedGenre = $("#genre").val();
        const selectedArtist = $("#artistFilter").val();

        // Фильтрация данных
        const filteredData = filterData(data, selectedGenre, selectedArtist);

        // Отображение отфильтрованных данных
        displayData(filteredData);
    });

    // Функция для фильтрации данных по жанру и исполнителю
    function filterData(data, genre, artist) {
        return data.filter(item => {
            const genreCondition = genre === "All" || item.genre === genre;
            const artistCondition = artist === "All" || item.artist === artist;
            return genreCondition && artistCondition;
        });
    }
});