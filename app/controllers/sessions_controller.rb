class SessionsController < Devise::SessionsController
  extend Apipie::DSL::Concern

  api :POST, '/staff/sign_in', 'Signs user in'
  param :staff, Hash, desc: 'Staff' do
    param :email, String, desc: 'Email'
    param :email, String, desc: 'Password'
  end

  def create
    respond_to do |format|
      format.html do
        super
      end
      format.json do
        self.resource = warden.authenticate(auth_options)

        if resource
          sign_in(resource_name, resource)
          render json: resource
        else
          render json: { error: 'Invalid Login' }, status: 401
        end
      end
    end
  end

  api :DELETE, '/staff/sign_out', 'Invalidates user session'

  def destroy
    respond_to do |format|
      format.html do
        super
      end
      format.json do
        if resource
          Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
          render json: {}, status: :ok
        else
          render json: {}, status: :unprocessable_entity
        end
      end
    end
  end
end
