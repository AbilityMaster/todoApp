export default class Api {
    getConfig() {
      return fetch('/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        });
    }

    save(config: any) {
        return fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        }).then(function(response) {
            return response.json();
        });
    }

    changeTaskStatus(idTask: string, checked: boolean) {
        fetch('/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idTask, checked })
        }).then(function(response) {
            return response.json();
        });
    }

    delete(idTask: string) {
        fetch(`/api/users/${idTask}`, {
            method: 'DELETE'
        }).then(function(response) {
        }).catch(err => console.log(err));
    }

    change(idTask: string, data: string) {
        fetch('/api/todo/modify', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idTask, data })
        }).then(function(response) {
            return response.json();
        });
    }
}