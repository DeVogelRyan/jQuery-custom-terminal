
$('body').terminal({

    show: function () {
        this.echo("Commands:\n" +
            "greet name - (gives a nice greeting)\n" +
            "touch fileName text - (create a file)\n" +
            "cat fileName - (output the text of a file)\n" +
            "ls - (list all the files)\n" +
            "placeCat width height - (this will place a cat on the screen (width and height are numbers!))\n" +
            "clear - (clears the screen)\n" +
            "Shortcuts:\n" +
            "Ctrl + L - (clears the screen)");
    },

    greet: function (name) {
        this.echo("Welcome, " + name);
    },
    placeCat: function (width, height) {
        const img = $('<img src="https://placekitten.com/' +
            width + '/' + height + '">');
        this.echo(img)
    },

    touch: function (fileName, text) {
        let file = [];
        if (localStorage.getItem("files")) {
            file = JSON.parse(localStorage.getItem('files'));
        }
        file.push({
            "fileName": fileName,
            "text": text
        })
        localStorage.setItem('files', JSON.stringify(file));
    },

    ls: function () {
        if (!localStorage.hasOwnProperty("files")) {
            this.echo("No files found!")
        } else {
            let data = JSON.parse(localStorage.getItem('files'));
            data.forEach(element => {
                this.echo(element.fileName);
            });
        }
    },

    cat: function (name) {
        if (!localStorage.hasOwnProperty("files")) {
            this.echo("No files found!")
        } else {
            let data = JSON.parse(localStorage.getItem('files'));
            var newArray = data.filter(function (obj) {
                return obj.fileName == name
            });
            //console.log(newArray)
            this.echo(newArray[0].text);
        }
    },

    rm: function (name) {
        if (!localStorage.hasOwnProperty("files")) {
            this.echo("No files found!")
        } else {
            let index = 0;
            let data = JSON.parse(localStorage.getItem('files'));
            let isFound = false;
            data.forEach(function(element, index) {
                if(element.fileName == name){
                    data.splice(index, 1); 
                    localStorage.setItem('files', JSON.stringify(data));
                    isFound = true;
                }
            })
            if(isFound == false){
                this.echo("File not found!");
            }
            else {
                this.echo("File " + name + " succesfully deleted!");
            }
        }
    },


}, {
    greetings: 'type show to see the commands'
});
