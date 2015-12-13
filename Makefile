PROGRAM=eslint
CONFIG=./.eslintrc
IGNORE=**/node_modules
CMD=$(PROGRAM) -c $(CONFIG) --ignore-pattern $(IGNORE)
lint:
	$(CMD) .
ch1:
	$(CMD) CH01\ -\ Introducing\ hapi
ch2:
	$(CMD) CH02\ -\ Building\ an\ API
ch3:
	$(CMD) CH03\ -\ Building\ a\ Website
ch4:
	$(CMD) CH04\ -\ Routes\ and\ Handlers\ in\ Depth
ch5:
	$(CMD) CH05\ -\ Understanding\ Requests\ and\ Responses
ch6:
	$(CMD) CH06\ -\ Validation\ with\ Joi/
ch7:
	$(CMD) CH07\ -\ Creating\ Modular\ Applications\ with\ Plugins
ch8:
	$(CMD) CH08\ -\ Leveraging\ Caching
ch9:
	$(CMD) CH09\ -\ Authentication\ and\ Security
