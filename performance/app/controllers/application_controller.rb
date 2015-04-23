class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #skip_before_filter :verify_authenticity_token
  protect_from_forgery with: :null_session

  def mandar_email_contato
    begin
      EnviarEmail.mandar_email(params["nome"], params["email"], params["titulo"], params["descricao"]).deliver_now
      flash[:notice] = "E-mail enviado, com sucesso!"
    rescue => exception
      flash[:error] = "Falha no envio do e-mail!"
      puts "Ocorreu um erro do tipo #{exception.class}: #{exception}"
    end  
    redirect_to "/contato"
  end 
end
