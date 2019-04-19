require 'swagger_helper'

describe 'Patients patients controller' do

  path '/api/patients/signin' do

    post 'sigin as patient' do
      tags 'Patients'
      consumes 'application/json'
      parameter name: :patients, in: :body, schema: {
        type: :object,
        properties: {
          first_name: { type: :string },
          last_name:  { type: :string },
          email:      { type: :string },
          password:   { type: :string },
        },
        required: [ :first_name, :last_name, :email, :password ]
      }

      response '201', 'patients created' do
        let(:patients) {}
        run_test!
      end

      response '422', 'invalid request' do
        let(:patients) { }
        run_test!
      end
    end
  end

end
