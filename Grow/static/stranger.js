function verifyColumn(columnIndex) {
            var column = document.getElementsByClassName("column")[columnIndex - 1];
            var cards = column.getElementsByClassName("card");
            for (var i = 0; i < cards.length; i++) {
                cards[i].classList.remove("red");
                cards[i].classList.add("green");
            }
        }

        function unverifyColumn(columnIndex) {
            var column = document.getElementsByClassName("column")[columnIndex - 1];
            var cards = column.getElementsByClassName("card");
            for (var i = 0; i < cards.length; i++) {
                cards[i].classList.remove("green");
                cards[i].classList.add("red");
            }
        }