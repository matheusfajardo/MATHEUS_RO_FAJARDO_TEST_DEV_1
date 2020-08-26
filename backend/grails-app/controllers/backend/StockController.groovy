package backend

class StockController {

    def stockService
    
    def index() {   
        render(404, text: 'NOT FOUND');
    }

    def getStocks(){
        if(params.company && params.hours){
            int horas = params.hours as Integer;
            
            render stockService.getStocks(params.company, horas) as grails.converters.JSON;
        }
               

        else
            render(status:400, text: 'BAD REQUEST');      
    }
}
