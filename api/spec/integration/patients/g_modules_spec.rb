require 'swagger_helper'

describe 'Patients modules controller' do

  path '/api/patients/modules/{module_id}/add_module' do

    patch 'add module' do
      tags 'Module'
      security [Bearer: {}]
      consumes 'application/json'
      parameter name: :module_id, in: :path, type: :integer

      response '201', 'patients created' do
        let(:patients) {}
        run_test!
      end

      response '404', 'Module not found' do
        let(:patients) { }
        run_test!
      end

      response '422', 'invalid request' do
        let(:patients) { }
        run_test!
      end
    end
  end

  path '/api/patients/modules/{module_id}/remove_module' do

    patch 'add module' do
      tags 'Module'
      security [Bearer: {}]
      consumes 'application/json'
      parameter name: :module_id, in: :path, type: :integer

      response '201', 'patients created' do
        let(:patients) {}
        run_test!
      end

      response '404', 'Module not found' do
        let(:patients) { }
        run_test!
      end

      response '422', 'invalid request' do
        let(:patients) { }
        run_test!
      end
    end
  end

  path '/api/patients/modules/my_modules' do

    get 'patient modules' do
      tags 'Module'
      security [Bearer: {}]
      consumes 'application/json'

      response '201', 'patients created' do
        let(:patients) {}
        run_test!
      end

      response '404', 'Module not found' do
        let(:patients) { }
        run_test!
      end

      response '422', 'invalid request' do
        let(:patients) { }
        run_test!
      end
    end
  end

    path '/api/patients/modules' do

    get 'get all existing module' do
      tags 'Module'
      security [Bearer: {}]
      consumes 'application/json'

      response '201', 'patients created' do
        let(:patients) {}
        run_test!
      end

      response '404', 'Module not found' do
        let(:patients) { }
        run_test!
      end

      response '422', 'invalid request' do
        let(:patients) { }
        run_test!
      end
    end
  end

end
