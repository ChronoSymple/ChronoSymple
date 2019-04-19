require 'swagger_helper'

describe 'Doctors of patient' do

  path '/api/patients/doctors' do

    get 'get all doctors' do
      tags 'Patient doctor controller'
      consumes 'application/json'
      security [Bearer: {}]
      response '200', 'patients created' do
        let(:doctor) { { title: 'foo', content: 'bar' } }
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:doctor) { { title: 'foo' } }
        run_test!
      end
    end
  end

  path '/api/patients/doctors/my_doctors' do

    get 'get the patient doctors' do
      tags 'Patient doctor controller'
      consumes 'application/json'
      security [Bearer: {}]
      response '200', 'patients created' do
        let(:doctor) { { title: 'foo', content: 'bar' } }
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:doctor) { { title: 'foo' } }
        run_test!
      end
    end
  end

  path '/api/patients/doctors/{doctor_id}/add_doctor' do

    patch 'assigne doctor to patient' do
      tags 'Patient doctor controller'
      consumes 'application/json'
      produces 'application/json'
      security [Bearer: {}]
      parameter name: :doctor_id, in: :path, type: :integer
      parameter name: :module, in: :body, schema: {
        type: :object,
        properties: {
          module_id: { type: :integer },
        },
        required: [ :module_id ]
      }

      response '200', 'patients created' do
        let(:doctor) { }
        run_test!
      end


      response '422', 'invalid request' do
        let(:doctor) { }
        run_test!
      end

      response '404', 'invalid request' do
        let(:doctor) { }
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:doctor) { }
        run_test!
      end
    end
  end

    path '/api/patients/doctors/{doctor_id}/remove_doctor' do

    patch 'assigne doctor to patient' do
      tags 'Patient doctor controller'
      consumes 'application/json'
      produces 'application/json'
      security [Bearer: {}]
      parameter name: :doctor_id, in: :path, type: :integer
      parameter name: :module, in: :body, schema: {
        type: :object,
        properties: {
          module_id: { type: :integer },
        },
        required: [ :module_id ]
      }

      response '200', 'patients created' do
        let(:doctor) { }
        run_test!
      end


      response '422', 'invalid request' do
        let(:doctor) { }
        run_test!
      end

      response '404', 'invalid request' do
        let(:doctor) { }
        run_test!
      end

      response '401', 'Unauthorized' do
        let(:doctor) { }
        run_test!
      end
    end
  end


end
