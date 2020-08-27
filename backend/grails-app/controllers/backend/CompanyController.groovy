package backend

class CompanyController {

    def companyService
    
    def index() {   
        render(404, text: 'NOT FOUND');
    }

    def getStocks(){
        if(params.company && params.hours){
            int horas = params.hours as Integer;
            
            render companyService.getStocks(params.company, horas) as grails.converters.JSON;
        }
        else
            render(status:400, text: 'BAD REQUEST');      
    }

    def getCompaniesWithDeviation(){
        render companyService.getCompaniesWithDeviation() as grails.converters.JSON;
    }
}
